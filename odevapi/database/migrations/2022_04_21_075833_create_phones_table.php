<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->unsignedBigInteger('address_id');
            $table->timestamps();
            $table->foreign('address_id')->on('addresses')->references('id')->onDelete('cascade')->onUpdate('cascade');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phones');
    }
}
