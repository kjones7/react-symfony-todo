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
        // TODO - Make sure `TrustServerCertificates` is not true for production
        $connectionParams = [
            'dbname' => 'master',
            'user' => 'sa',
            'password' => 'Pass@word123',
            'host' => 'db',
            'driver' => 'sqlsrv',
            'driverOptions' => [
                'TrustServerCertificate' => '1',
            ],
        ];
        $conn = \Doctrine\DBAL\DriverManager::getConnection($connectionParams);
        $sql = 'SELECT 1';
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();

        return $this->render('test.html.twig', [
            'message' => 'The database is working',
        ]);
    }
}
