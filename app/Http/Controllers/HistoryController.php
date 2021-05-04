<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\History;

class HistoryController extends Controller
{
    //
    public function index () 
    {
        
        
        return view('create_history', [
            
            ]);
    }
    
    public function create()
    {
         $histories = new History;

        //ビューの階層を書く
        return view('create_history', [
            'histories' => $histories,
        ]);
    }
    
    public function store(Request $request)
    {
        $histories = new History;
        //
        /*
        $request->histories()->create([
        'name' => $request->name,
        'description' => $request->description,
        ]);*/


        return redirect('/');
    }
}
