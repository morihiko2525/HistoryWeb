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
        
        //monthもdayも0だったら
        if($request->month == 0 && $request->day == 0)
        {         
            $events->month = 0;
            $events->day = 0;

            $events->date = $request->year . '-' . 1 . '-' . 1 ;

        }else{
            //全て0でなければそのまま入れる
            $events->month = $request->month;
            $events->day = $request->day;
            $events->date = $request->year . '-' . $request->month . '-' . $request->day ;
        }

        //dayのみnullだったら
        if($request->month != 0 && $request->day == 0)
        {         
            $events->month = $request->month;
            $events->day = 0;

            $events->date = $request->year . '-' . $request->month . '-' . 1 ;
        }

        //monthのみnullでdayが入っていたら
        if($request->month == 0 && $request->day != 0)
        {         
            //エラーを出す
        }

        $events->history_id = $request->history_id;
        
        $events->save();

    }

    public function updateEvent(Request $request){

        $events = Event::findOrFail($request->id);

        $write_year = $events->year;

        if($events->month == 0)
        {
            $write_month = 1;
        }else{
            $write_month = $events->month;
        }

        if($events->day == 0)
        {
            $write_day = 1;
        }else{
            $write_day = $events->day;
        }

        if($request->name != null){
            $events->name = $request->name;
        }

        if($request->description != null){
            $events->description = $request->description;
        }

        //yearが編集されていれば
        if($request->year != null){
            $events->year = $request->year;
            $events->date = $request->year . '-' . $events->month . '-' . $events->day;
            $write_year = $request->year;
        }

        //Month, dayが編集されていなければ
        if($request->month == null && $request->day == null)
        {
            //保存する。 処理自体がこれで終わりでOK
            $events->save();
        }


        //先にdayの編集処理を入れる
        if($request->day != null)
        {
            if($request->day == 0)
            {   
                //0だったらdateには1を入れるのでその処理。
                $write_day = 1;
            }
            else
            {
                //
                $write_day = $request->day;
            }
            //
            $events->day = $request->day;
        }
        
        //monthが変更されている
        if($request->month != null){
            //view側で0だったら0が送られてくる。
            if($request->month == 0)
            {
                if($event->day == 0)
                {
                    //日にちエラーを出す
                    //TODO
                }
                //0だったらdateには1を入れる
                $write_month = 1;
            }
            else
            {
                //それ以外はそのまま月を入れる
                $write_month = $request->month;
            }
            $events->month = $request->month;
        }

        $events->date = $write_year . '-' . $write_month . '-' . $write_day ;
        
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
