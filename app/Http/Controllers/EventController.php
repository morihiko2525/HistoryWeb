<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\History;
    
class EventController extends Controller
{
    public function index($id)
    {
        //
        //$events = Event::where('history_id', 1)->first();
        $events = Event::where('history_id', $id)->orderBy('date', 'asc')->get();
        return view('history_view', [
            'events' => $events,
            'his_id' => $id,
            ]);
    }

    public function create()
    {
        //
        $events = new Event;

        
    }
    
    public function store(Request $request)
    {

        $request->validate([
            'month' => 'required|max:255',
            'day' => 'required|max:10',
        ]);
        
        $events = new Event;
        $events->name = $request->name;
        $events->description = $request->description;
        $events->year = $request->year;
        $events->month = $request->month;
        $events->day = $request->day;
        
        $events->date = $request->year . '-' . $request->month . '-' . $request->day ;
        $events->history_id = $request->his_id;
        
        $events->save();
        
        return redirect(route('events.edit',[
            'id' => $request->his_id,
            ]));
    }
    
    public function edit($id){
        $events = Event::where('history_id', $id)->orderBy('date', 'asc')->get();
        return view('history_edit', [
            'events' => $events,
            'his_id' => $id,
            ]);
    }
    
    public function update(Request $request){
        
        $events = Event::findOrFail($request->id);
        
        $events->name = $request->name;
        $events->description = $request->description;
        $events->year = $request->year;
        $events->month = $request->month;
        $events->day = $request->day;
        $events->date = $request->year . '-' . $request->month . '-' . $request->day ;
        $events->save();
        
        return redirect(route('events.edit',[
            'id' => $request->his_id,
            ]));

    }
    
    public function destroy(Request $request){
        $events = Event::findOrFail($request->id);
        
        $events->delete();

        return back();
    }

    public function getAllEvents(Request $request){
        $events = Event::All();
        return response([
            'events' => $events
            ]);
    }
}
