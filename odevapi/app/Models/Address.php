<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = [
        'city_id',
        'district_id',
        'address_type_id',
    ];

    public function getAddress()
    {
        return $this->belongsTo(Personal::class, 'id', 'id'); // ADRES - PERSONALE AİT!
    }
    public function getDistrict()
    {
        return $this->hasOne(District::class, 'id', 'district_id'); //
    }
    public function getPhone()
    {
        return $this->belongsTo(Phone::class, 'address_id', 'id');
    }
    public function getCity()
    {
        return $this->hasOne(City::class, 'id', 'city_id');
    }
    public function getAddressType()
    {
        return $this->hasMany(AddressType::class, 'id', 'address_type_id');
    }
}
