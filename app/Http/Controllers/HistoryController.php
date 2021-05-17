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
    
    public function showMyHistories($user_id){
        $histories = History::where('user_id', $user_id)->get();
        return $histories;
    }
    
    public function __construct(){
        $this->middleware('auth');    
    }
    
    public function getHistoryName($id){
        $his_name = History::where('id', $id)->value('name');
        return $his_name;
    }
    
    public function getHistoryDescription($id){
        $his_desc = History::where('id', $id)->value('description');
        return $his_desc;
    }
    
    public function getHistoryUserID($id){
        $his_userID = History::where('id', $id)->value('user_id');
        return $his_userID;
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
        //$histories->description = $request->description;
        //$histories->user_id = $request->user_id;
        $histories->save();
        /*
        return redirect(route('events.index',[
            'id' => $histories->id,
            ]));*/
    }
}
