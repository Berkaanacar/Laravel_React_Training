<?php

namespace App\Http\Controllers;

use App\Models\AddressType;
use App\Models\City;
use App\Models\District;
use Illuminate\Http\Request;

//BU CONTROLLER 'I PERSONALCONTROLLERA TAŞIDIM.



class CityDistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()

    {
        // $cities = City::select('city_name as label', 'id as value')->get();
        // $districts = District::select('district as label', 'id as value', 'city_id')->get();
        // $addressTypes = AddressType::select('type as label', 'id as value')->get();
        // return response()->json(["cities" => $cities, "districts" => $districts, "addressTypes" => $addressTypes]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
