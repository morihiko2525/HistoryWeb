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
    
    public function __construct(){
        $this->middleware('auth');    
    }
    
    public function create()
    {
         $histories = new History;

        //ここの上側にはビューの階層を書く
        return view('create_history', [
            'histories' => $histories,
        ]);
    }
    
    public function store(Request $request)
    {
        $histories = new History;
        
        $histories->name = $request->name;
        $histories->description = $request->description;

        $histories->save();
        
        return redirect(route('events.index',[
            'id' => $histories->id,
            ]));
    }
}
