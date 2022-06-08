<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'surname',
        'birthday',
        'birthplace',
        'address_id',
    ];

    public function getAddress()
    {
        return $this->hasMany(Address::class, 'id', 'address_id');
    }
}
