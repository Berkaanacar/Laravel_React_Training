<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\AddressType;
use App\Models\City;
use App\Models\District;
use App\Models\Personal;
use App\Models\Phone;
use Faker\Provider\ar_EG\Person;
use Illuminate\Http\Request;

class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personals = Personal::all();
        $cities = City::select('city_name as label', 'id as value')->get();
        $districts = District::select('district as label', 'id as value', 'city_id')->get();
        $addressTypes = AddressType::select('type as label', 'id as value')->get();
        // return response()->json(["cities" => $cities, "districts" => $districts, "addressTypes" => $addressTypes]);
        return response()->json(["personals" => $personals, "cities" => $cities, "districts" => $districts, "addressTypes" => $addressTypes]);
    }

    public function list()
    {
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
        $addAddress = Address::insertGetId([
            'city_id' => $request->personals['city_id'],
            'district_id' => $request->personals['district_id'],
            'address_type_id' => $request->personals['address_type_id'],

        ]);

        $add = Personal::insertGetId([
            'name' => $request->personals['name'],
            'surname' => $request->personals['surname'],
            'birthday' => date('Y-m-d', strtotime($request->birthday)),
            'birthplace' => $request->personals['birthplace'],
            'address_id' => $addAddress,

        ]);
        foreach ($request->phone as $item) {
            $phone = Phone::insertGetId([
                'phone' => $item['phone'],
                'address_id' => $addAddress
            ]);
        }

        return response()->json(["add" => $add, "addAddress" => $addAddress, "phone" => $phone]);
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
