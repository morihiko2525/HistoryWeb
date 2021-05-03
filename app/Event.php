<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    public function history(){
        return $this->hasOne('App\History');
    }
}
