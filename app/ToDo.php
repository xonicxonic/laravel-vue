<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    protected $fillable = [
        'title', 'description','user_id'
    ];
}
