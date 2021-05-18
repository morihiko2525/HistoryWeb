<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeImageColumnOnHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('histories', function (Blueprint $table) {
            //
            $table->string("img_name")->nullable(true)->change();
            $table->string("file_path")->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('histories', function (Blueprint $table) {
            //
            $table->string("img_name")->nullable(false);
            $table->string("file_path")->nullable(false);
        });
    }
}
