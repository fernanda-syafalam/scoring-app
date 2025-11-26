<?php

namespace App\Http\Controllers;

use App\Events\DropVerification;
use App\Events\IndicatorPelanggaran;
use App\Events\KetuaPertandingan;
use App\Events\Operator;
use App\Events\Scoring;
use App\Events\ScoringUpdate;
use App\Events\WinnerEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BroadcastController extends Controller
{
    /**
     * Broadcast scoring event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function scoreEvent(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new Scoring($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast score update event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function scoreUpdate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
            'message.blueScore' => 'required|integer|min:0',
            'message.redScore' => 'required|integer|min:0',
            'message.bluePenalty' => 'required|array',
            'message.redPenalty' => 'required|array',
            'message.droppingBlue' => 'required|integer|min:0',
            'message.droppingRed' => 'required|integer|min:0',
        ]);

        event(new ScoringUpdate($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast drop verification event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function dropVerification(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new DropVerification($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast operator update event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function operatorUpdate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new Operator($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast ketua pertandingan update event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function ketuaPertandinganUpdate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new KetuaPertandingan($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast verification update event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function verifUpdate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new Operator($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast penalty indicator event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function penalty(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new IndicatorPelanggaran($validated['message']));

        return response()->json(['status' => 'success']);
    }

    /**
     * Broadcast winner event.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function winner(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|array',
        ]);

        event(new WinnerEvent($validated['message']));

        return response()->json(['status' => 'success']);
    }
}
