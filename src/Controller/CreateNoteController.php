<?php

namespace App\Controller;

use App\Entity\Note;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreateNoteController extends AbstractController
{
    #[Route('api/note/create', name: 'app_create_note', methods: ['POST'])]
    public function saveNote(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $textContent = $data['content'] ?? '';

        if (!$textContent) {
            $response = $this->json(['success' => false, 'message' => 'Text is empty.']);
            return $response;
        }

        $noteEntity = new Note();
        $noteEntity->setContent($textContent);
        $em->persist($noteEntity);
        $em->flush();

        $response = $this->json(['success' => true]);
        return $response;
    }
}
