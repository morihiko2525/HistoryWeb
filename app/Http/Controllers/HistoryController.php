<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HistoryController extends Controller
{
    //
    public function index () 
    {
        $hello = 'Hello,World!';
        $hello_array = ['Hello', 'こんにちは', 'ニーハオ'];

        return view('index', compact('hello', 'hello_array'));
    }
    
    public function create(){
        
    }
    
    public function store(Request $request)
    {
        //
    }
}
