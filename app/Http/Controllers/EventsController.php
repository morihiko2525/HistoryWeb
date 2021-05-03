<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{
    protected $fillable = ['name', 'body'];
    
    public function index()
    {
        //
        $events = Event::all();
        
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
        /*
        $events->name = $request->name;
        $events->description = $request->description;
        $events->year = $request->year;
        $events->month = $request->month;
        $events->day = $request->day;
        
        $events->date = "2020-01-01";
        $events->history_id = 1;
        
        $events->save();*/
        $request->history()->events()->create([
            'name' => $request->name,
            'description' => $request->description,
            'year' => $request->year,
            'month' => $request->month,
            'day' => $request->day,
        
            'date' => "2020-01-01",
        ]);
        
        return redirect('/history_view');
        
    }
}
