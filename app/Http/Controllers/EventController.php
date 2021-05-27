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
        /*return view('history_view', [
            'events' => $events,
            'his_id' => $id,
            ]);*/

            return response([
                'events' => $events,
            ]);
    }

    public function create()
    {
        //
        $events = new Event;

        
    }
    
    public function addEvent(Request $request)
    {

        $request->validate([
            'month' => 'required|max:12',
            'day' => 'required|max:31',
        ]);
        
        $events = new Event;
        $events->name = $request->name;
        $events->description = $request->description;
        $events->year = $request->year;
        
        //monthもdayもnullだったら
        if($request->month == null && $request->day == null)
        {         
            $events->month = 0;
            $events->day = 0;

            $events->date = $request->year . '-' . 1 . '-' . 1 ;

        }else{
            //全てnullでなければそのまま入れる
            $events->month = $request->month;
            $events->day = $request->day;
            $events->date = $request->year . '-' . $request->month . '-' . $request->day ;
        }

        //dayのみnullだったら
        if($request->month != null && $request->day == null)
        {         
            $events->month = $request->month;
            $events->day = 0;

            $events->date = $request->year . '-' . $request->month . '-' . 1 ;
        }

        //monthのみnullでdayが入っていたら
        if($request->month == null && $request->day != null)
        {         
            //エラーを出す
        }

        $events->history_id = $request->history_id;
        
        $events->save();

    }

    public function updateEvent(Request $request){

        $events = Event::findOrFail($request->id);

        if($request->name != null){
            $events->name = $request->name;
        }

        if($request->description != null){
            $events->description = $request->description;
        }

        if($request->year != null){
            $events->year = $request->year;
            $events->date = $request->year . '-' . $events->month . '-' . $events->day ;
        }

        if($request->month != null){
            $events->month = $request->month;
            $events->date = $events->year . '-' . $request->month . '-' . $events->day ;
        }

        if($request->day != null){
            $events->day = $request->day;
            $events->date = $events->year . '-' . $events->month . '-' . $request->day ;
        }

        $events->save();
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
    
    public function deleteEvent(Request $request){
        $events = Event::findOrFail($request->id);
        
        $events->delete();
    }

    public function getAllEvents(Request $request){
        $events = Event::All();
        return response([
            'events' => $events
            ]);
    }
}
