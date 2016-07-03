<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class GenusController extends Controller
{
    /**
     * @Route("/genus/{genusName}")
     *
     * @param $genusName
     * @return Response
     */
    public function showAction($genusName)
    {
/*        $templating = $this->container->get('templating');
        $html = $templating->render('genus/show.html.twig', [
            'name' => $genusName
        ]);*/
        $notes = [
            '12312312312',
            'adasdasdasd',
            '131fefe1f'
        ];
        return $this->render('genus/show.html.twig', [
            'name' => $genusName,
            'notes' => $notes
        ]);

        //return new Response($html, 200);

        /*
         * http://twig.sensiolabs.org/documentation
         *
         * {{ }} say something tag - print
         * {% %} do something tag - logic, for, if, etc...
         *
         * dump();
         */
    }

    /**
     * @Route("/genus/{genusName}/notes", name="genus_notes")
     * @Method("GET")
     */
    public function getNotesAction()
    {
        $notes = [
            '123123' => '12312312312',
            'asdasdasd' => 'adasdasdasd',
            '213123123 ' => '131fefe1f'
        ];

        return new JsonResponse($notes);
        return new Response(json_encode($notes));
    }
}