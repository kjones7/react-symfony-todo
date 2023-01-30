<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// TODO - Namespace was copied from example, should this be updated?
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/')]
class TestController extends AbstractController
{
    #[Route('/', methods: ['GET'], name: 'test_index')]
    public function index(Request $request)
    {
        $connectionParams = [
            'dbname' => 'todo_app',
            'user' => 'todo_user',
            'password' => getenv('TODO_USER_PW'),
            'host' => 'db',
            'port' => '5432',
            'driver' => 'pdo_pgsql',
        ];
        $conn = \Doctrine\DBAL\DriverManager::getConnection($connectionParams);
        $sql = 'SELECT 1';
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();


        return new Response('The database is working', Response::HTTP_OK);
    }
}
