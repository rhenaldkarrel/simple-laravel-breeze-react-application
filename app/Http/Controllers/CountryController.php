<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $countries = Country::all();
        $totalRecords = $countries->count();

        return response()->json([
            'data' => $countries,
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
            'name' => 'required|string|max:150',
            'code' => 'required|string|max:3',
            'continent' => 'required|string|max:50',
        ];

        $validatedData = $request->validate($rules);

        $country = Country::create($validatedData);

        return response()->json($country, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json(Country::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Country $country)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Country $country)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        //
    }
}
