<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230630090120 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE [user] (id INT IDENTITY NOT NULL, email NVARCHAR(180) NOT NULL, roles VARCHAR(MAX) NOT NULL, password NVARCHAR(255) NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON [user] (email) WHERE email IS NOT NULL');
        $this->addSql('EXEC sp_addextendedproperty N\'MS_Description\', N\'(DC2Type:json)\', N\'SCHEMA\', \'dbo\', N\'TABLE\', \'[user]\', N\'COLUMN\', roles');
        $this->addSql('DROP TABLE spt_fallback_db');
        $this->addSql('DROP TABLE spt_fallback_dev');
        $this->addSql('DROP TABLE spt_fallback_usg');
        $this->addSql('DROP TABLE spt_monitor');
        $this->addSql('DROP TABLE MSreplication_options');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA db_accessadmin');
        $this->addSql('CREATE SCHEMA db_backupoperator');
        $this->addSql('CREATE SCHEMA db_datareader');
        $this->addSql('CREATE SCHEMA db_datawriter');
        $this->addSql('CREATE SCHEMA db_ddladmin');
        $this->addSql('CREATE SCHEMA db_denydatareader');
        $this->addSql('CREATE SCHEMA db_denydatawriter');
        $this->addSql('CREATE SCHEMA db_owner');
        $this->addSql('CREATE SCHEMA db_securityadmin');
        $this->addSql('CREATE SCHEMA dbo');
        $this->addSql('CREATE TABLE spt_fallback_db (xserver_name NVARCHAR(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, xdttm_ins DATETIME2(6) NOT NULL, xdttm_last_ins_upd DATETIME2(6) NOT NULL, xfallback_dbid SMALLINT, name NVARCHAR(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, dbid SMALLINT NOT NULL, status SMALLINT NOT NULL, version SMALLINT NOT NULL)');
        $this->addSql('CREATE TABLE spt_fallback_dev (xserver_name NVARCHAR(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, xdttm_ins DATETIME2(6) NOT NULL, xdttm_last_ins_upd DATETIME2(6) NOT NULL, xfallback_low INT, xfallback_drive NCHAR(2) COLLATE SQL_Latin1_General_CP1_CI_AS, low INT NOT NULL, high INT NOT NULL, status SMALLINT NOT NULL, name NVARCHAR(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, phyname NVARCHAR(127) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL)');
        $this->addSql('CREATE TABLE spt_fallback_usg (xserver_name NVARCHAR(30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, xdttm_ins DATETIME2(6) NOT NULL, xdttm_last_ins_upd DATETIME2(6) NOT NULL, xfallback_vstart INT, dbid SMALLINT NOT NULL, segmap INT NOT NULL, lstart INT NOT NULL, sizepg INT NOT NULL, vstart INT NOT NULL)');
        $this->addSql('CREATE TABLE spt_monitor (lastrun DATETIME2(6) NOT NULL, cpu_busy INT NOT NULL, io_busy INT NOT NULL, idle INT NOT NULL, pack_received INT NOT NULL, pack_sent INT NOT NULL, connections INT NOT NULL, pack_errors INT NOT NULL, total_read INT NOT NULL, total_write INT NOT NULL, total_errors INT NOT NULL)');
        $this->addSql('CREATE TABLE MSreplication_options (optname NVARCHAR(256) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, value BIT NOT NULL, major_version INT NOT NULL, minor_version INT NOT NULL, revision INT NOT NULL, install_failures INT NOT NULL)');
        $this->addSql('DROP TABLE [user]');
    }
}
