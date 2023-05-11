<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = City::all();
        $totalRecords = $cities->count();

        return response()->json([
            'data' => $cities,
            'total_records' => $totalRecords,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:30',
            'state_id' => 'required|integer',
            'code' => 'nullable|string|max:100',
        ];

        $validatedData = $request->validate($rules);

        $city = City::create($validatedData);

        return response()->json($city, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json(City::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        //
    }
}
