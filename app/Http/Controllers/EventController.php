<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

    
class EventController extends Controller
{
    protected $fillable = ['name', 'body'];
    
    public function index($id)
    {
        //
        //$events = Event::where('history_id', 1)->first();
        $events = Event::where('history_id', $id)->get();
        return view('history_view', [
            'events' => $events,
            ]);
    }
    
    public function create()
    {
        //
        $events = new Event;

        // メッセージ作成ビューを表示
        return view('tasks.create', [
            'tasks' => $tasks,
        ]);
    }
    
    public function store(Request $request)
    {
        //
        /*
        $request->validate([
            'content' => 'required|max:255',
            'status' => 'required|max:10',
        ]);*/
        
        
        $events = new Event;
        $events->name = $request->name;
        $events->description = $request->description;
        $events->year = $request->year;
        $events->month = $request->month;
        $events->day = $request->day;
        
        $events->date = "2020-01-01";
        $events->history_id = 1;
        
        $events->save();

        return redirect('/history_view');
    }
}
