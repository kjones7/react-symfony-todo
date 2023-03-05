#!/bin/sh
# Helpful documentation:
# - `[]` in if statements: https://www.man7.org/linux/man-pages/man1/test.1.html

# Tells shell to exit immediately if any command returns a non-zero exit code (failure)
set -e

# Checks if the first argument passed to the script starts with a hyphen (-), which is typically used to indicate
# command-line options. If it does, then it assumes that the user intends to run php-fpm and passes all the arguments
# to that command
# Ex: Checks if first arg is `-f` or `--some-option`
# Other notes:
#     - ${1#-} is a parameter expansion that removes any leading hyphen from the first argument $1
#     - I think this code block is needed in case `./docker-entrypoint.sh -f` is ever used. Then this code would change
#	    the positional parameters would be changed to be equivalent to running `./docker-entrypoint.sh php-fpm -f`
if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ "$1" = 'php-fpm' ] || [ "$1" = 'php' ] || [ "$1" = 'bin/console' ]; then
	# Install the project the first time PHP is started
	# After the installation, the following block can be deleted

	# Checks if composer.json exists (i.e. checks if this is the first time running the project)
	# See https://www.man7.org/linux/man-pages/man1/test.1.html
	if [ ! -f composer.json ]; then
		CREATION=1

		rm -Rf tmp/
		composer create-project "symfony/skeleton $SYMFONY_VERSION" tmp --stability="$STABILITY" --prefer-dist --no-progress --no-interaction --no-install

		cd tmp
		composer require "php:>=$PHP_VERSION"
		composer config --json extra.symfony.docker 'true'
		cp -Rp . ..
		cd -

		rm -Rf tmp/
	fi

	if [ "$APP_ENV" != 'prod' ]; then
		composer install --prefer-dist --no-progress --no-interaction
	fi

	if grep -q ^DATABASE_URL= .env; then
		# After the installation, the following block can be deleted
		if [ "$CREATION" = "1" ]; then
			echo "To finish the installation please press Ctrl+C to stop Docker Compose and run: docker compose up --build"
			sleep infinity
		fi

		echo "Waiting for db to be ready..."
		ATTEMPTS_LEFT_TO_REACH_DATABASE=60
		until [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ] || DATABASE_ERROR=$(bin/console dbal:run-sql "SELECT 1" 2>&1); do
			if [ $? -eq 255 ]; then
				# If the Doctrine command exits with 255, an unrecoverable error occurred
				ATTEMPTS_LEFT_TO_REACH_DATABASE=0
				break
			fi
			sleep 1
			ATTEMPTS_LEFT_TO_REACH_DATABASE=$((ATTEMPTS_LEFT_TO_REACH_DATABASE - 1))
			echo "Still waiting for db to be ready... Or maybe the db is not reachable. $ATTEMPTS_LEFT_TO_REACH_DATABASE attempts left"
		done

		if [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ]; then
			echo "The database is not up or not reachable:"
			echo "$DATABASE_ERROR"
			exit 1
		else
			echo "The db is now ready and reachable"
		fi

		if [ "$( find ./migrations -iname '*.php' -print -quit )" ]; then
			bin/console doctrine:migrations:migrate --no-interaction
		fi
	fi

	setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var
	setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX var
fi

# Watch and rebundle JS on change for dev environment
if [ "$APP_ENV" == 'dev' ]; then
	npm run watch &
fi

# run the official Docker PHP entrypoint script with any arguments passed to the docker-entrypoint.sh script
exec docker-php-entrypoint "$@"
