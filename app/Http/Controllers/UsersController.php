<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;
use App\Http\Controllers\Component;
use Carbon\Carbon;

class UsersController extends Controller
{
    private $_userComponent;
    
    // public function __construct(UserComponent $userComponent)
    // {
    //     $this->_userComponent = $userComponent;
    //     echo $this->_userComponent->foo();
    // }
    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Auth/User 関係
    
    //signin/login状態の管理には、token(cookie)、id(user)を利用する。
    // dbtableを編集した後は、必ずsave()!!
    // $request->cookie('cookie_name') == Cookie::get('cookie_name')
    
    public function signup(Request $request){

        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:users,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        $user = new User; //new User
        
        if ($user) { //ユーザが存在すか確認
            $user->email = request()->get("email"); //各データを登録
            $user->password = Hash::make(request()->get("password")); //password をhash化
            $user->name = request()->get("name");
            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->token = $token; //ユーザのトークンに登録
            
            $carbon = Carbon::now('Asia/Tokyo');
            $carbon->addDays(3);
            $user->token_expire_at = $carbon;
            
            $user->save(); //ユーザのデータを上書き保存
            
            $cookie = Cookie::make('my_token', $token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([ //ユーザ情報を返す
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }else{ //ifではじかれると、nullを返す。
            return response([
                "user_data" => null,
                ]);
        }
    }
    
    public function login(Request $request){
        $email = request()->get('email');
        
        if(!$this->isMailExists($email)){
            return response([
                'user_data' => -1,
                ]);
        }

        $user = User::where('email', $email)->first();
                        
        $pass = request()->get('password');
        $hashed_pass = $user->password;

        //if ($pass == $hashed_pass){
        if (Hash::check($pass, $hashed_pass)){
            
            $token = Str::random(255);
            $user->token = $token;
            
            $carbon = Carbon::now('Asia/Tokyo');
            $carbon->addDays(3);
            $user->token_expire_at = $carbon;
            
            
            $user->save();
            
            $cookie = Cookie::make('my_token', $token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        
        return response(['user_data' => -2,
        ]);
        
    }
    
    public function login_init(Request $request){
        
        $token = Cookie::get('my_token'); //Token check
        
        if(!$this->isTokenExists($token) || $token == null){
            return response()->json(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        
        if(!$this->isTokenValid($token)){
            return response()->json(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        
        $user = $this->getTokenUser($token); //get user
        
        $token = Str::random(255); //reflesh token
        $user->token = $token;
        
        $carbon = Carbon::now('Asia/Tokyo');
        $carbon->addDays(3);
        $user->token_expire_at = $carbon;
            
        $user->save();
        
        $cookie = Cookie::make('my_token', $token, 4320);//cookieを作成
        $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
        
        return response([
            'user_data' => $user,
            ])->cookie($cookie)->cookie($cookie_2);
    }
    
    public function logout(Request $request){
        $user = User::where('token', $request->cookie('my_token'))->first();
        if ($user){
            $user->token = null;
            $user->token_expire_at = null;
            $user->save();
            return response()->json(['status' => $user->token])->withoutCookie('my_token')->withoutCookie('loggedin');
        }else{
            return response(['message' => 'ohhhhhhhhhhhh']);
        }
    }
    
    public function is_me(Request $request){
        $token = Cookie::get('my_token');
        $user = User::where("token",$token)->first();
        if ($token && $user) {
            return [
            "user" => $user
            ];
        }else{
            abort(401);
        }
    }
    
    public function fetch_userdata(Request $request){
        
        $user = User::where('id', request()->id)->first();
        if($user){
            return response(['user_data'=>$user]);
        }
        return response(['user' => $user,
                         'id' => request()->id]);
    }
    
    public function getUserData(){
        $token = Cookie::get('my_token'); //Token check
        if(!$this->isTokenExists($token) || $token == null){
            return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        
        if(!$this->isTokenValid($token)){
            return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        
        $user = $this->getTokenUser($token); //get user

        return response([
            'user' => $user,
            ]);
    }

    public function fetch_userdetails(Request $request){
        $user_id = request()->id;
        $c_data = array();
        $_comment = array();
        $count = 0;
        
        $favorites = User::find($user_id)->favorited_illusts()->orderBy('favorites.created_at', 'desc')->select(["favorites.id", "illust_id","path","title","illusts.user_id"])->limit(3)->get();
        
        $comments = COmment::where('user_id', $user_id)->orderBy('created_at', 'desc')->select(["id","illust_id", "comment", "user_id"])->limit(3)->get();
        
        if($comments->count()>0){
                foreach ($comments as $comment){
                    $_comment = array_merge($comment->toArray(), Illust::where('id', $comment->illust_id)->first()->toArray());
                    $c_data[$count] = $_comment;
                    $count += 1;
                }
            }
        
        
        $illusts = Illust::where('user_id', request()->id)->orderBy('created_at', 'desc')->select(["id","path","title"])->limit(3)->get();
        
        return response([
                        "ills" => $illusts,
                        "favs" => $favorites,
                        "coms" => $c_data,
                        ]);
        
    }
    
    //forOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUseforOnlyDebugUse
    
    public function isLoggedIn(Request $request){
        $token = Cookie::get('my_token');
        if($token == null){
            return ['isLoggedIn' => false];
        }
        return ['isloggedin' => $this->isTokenExists($token)];
    }

//=============================================================================================================
    //privates
    
    private function isMailExists($email){ //bool
        return DB::table('users')->where('email', $email)->exists();
    }
    
    private function isTokenExists($token){ //bool
        return DB::table('users')->where('token', $token)->exists();
    }
    
    private function isTokenValid($token){ //bool
        $user = User::where('token', $token)->first();
        $carbon_expire = $user->token_expire_at;
        $carbon_now = Carbon::now('Asia/Tokyo');
        return  $carbon_expire->gt($carbon_now);
    }
    
    private function isUserExists($id){ //bool
        return DB::table('users')->where('id', $id)->exists();
    }
    
    private function getTokenUser($token){ //user
        return User::where('token', $token)->first();
    }
    
    private function getUser($id){ //user
        return User::where('id', $id)->first();
    }

    //=============================================================================================================
    //privates

}