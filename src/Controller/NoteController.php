<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NoteController extends AbstractController
{
    #[Route('api/notes', name: 'app_create_note', methods: ['POST'])]
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

        $response = $this->json(['success' => true, 'id' => $noteEntity->getId()]);
        return $response;
    }

    #[Route('api/notes', name: 'app_read_note', methods: ['GET'])]
    public function read(NoteRepository $noteRepository): Response
    {
        $notes = $noteRepository->findAll();
        return $this->json($notes);
    }
}
