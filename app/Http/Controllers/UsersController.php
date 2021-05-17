<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User; // 追加

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;

class UsersController extends Controller
{
    public function index()
    {
        // ユーザ一覧をidの降順で取得
        //$users = User::orderBy('id', 'desc')->paginate(10);

        // ユーザ一覧ビューでそれを表示
        return view('userpage', [
            //'users' => $users,
        ]);
    }
    
        public function show($id)
    {
        // idの値でユーザを検索して取得
        $user = User::findOrFail($id);

        // ユーザ詳細ビューでそれを表示
        return view('users.show', [
            'user' => $user,
        ]);
    }

    ///Auth

    public function signup(Request $request){

        $request->validate([
            'name' => 'max:20|required',
            'email' => 'unique:users,email|required',
            'password' => 'required|max:255|min:5',
            ]);
        
        $user = new User; //new User
        
        if ($user) { //ユーザが存在するか確認
            $user->email = request()->get("email"); //各データを登録
            $user->password = Hash::make(request()->get("password")); //password をhash化

            $token = Str::random(255); //今回のセッション用のトークンを発行
            $user->token = $token; //ユーザのトークンに登録
            
            $carbon = Carbon::now('Asia/Tokyo'); //Carbon: Laravelの時間ライブラリ
            $carbon->addDays(3); //3日後を期限にしている

            $user->token_expired_at = $carbon; 
            
            $user->save(); //ユーザのデータを上書き保存
            
            $cookie = Cookie::make('my_token', $token, 4320); //cookieを作成 4320の部分は時間の引数(分) こっちはJSに見せたらやばい。
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false); //ログインをしているかどうかを こっちはJSに見せる用

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
        if (Hash::check($pass, $hashed_pass)){ //パスワードがあるかどうか
            
            $token = Str::random(255); //トークンを作成
            $user->token = $token;
            
            $carbon = Carbon::now('Asia/Tokyo');
            $carbon->addDays(3);
            $user->token_expired_at = $carbon;
            
            
            $user->save();
            
            $cookie = Cookie::make('my_token', $token, 4320);//cookieを作成
            $cookie_2 = Cookie::make('loggedin', true, 4320,null,null,null,false);
            
            return response([
                'user_data' => $user,
                ])->cookie($cookie)->cookie($cookie_2);
        }
        
        return response(['user_data' => -1,
        ]);
        
    }
    
    public function login_init(Request $request){
        $token = Cookie::get('my_token'); //Token check

        if(!$this->isTokenExists($token) || $token == null){
            return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        if(!$this->isTokenValid($token)){
            return response(['user_data' => -1])->withoutCookie('my_token')->withoutCookie('loggedin');
        }
        
        $user = $this->getTokenUser($token); //get user
        
        $token = Str::random(255); //reflesh token
        $user->token = $token;
        
        $carbon = Carbon::now('Asia/Tokyo');
        $carbon->addDays(3);
        $user->token_created_at = $carbon;
            
        $user->save();
        
        $cookie = Cookie::make('my_token', $token);//cookieを作成
        $cookie_2 = Cookie::make('loggedin', true,0,null,null,null,false);
        
        return response([
            'user_data' => $user,
            ])->cookie($cookie)->cookie($cookie_2);
    }
    
    public function logout(Request $request){
        $user = User::where('token', $request->cookie('my_token'))->first(); //トークンを持ったユーザーがいるかどうか
        if ($user){
            $user->token = null;
            $user->token_expired_at = null;
            $user->save();
            return response(['status' => $user->token])->withoutCookie('my_token')->withoutCookie('loggedin');
        }else{
            return response(['message' => 'ohhhhhhhhhhhh'
            ]);
        }
    }

    public function is_me(Request $request){
        $token = Cookie::get('my_token');
        $user = User::where("token",$token)->first();
        if ($token && $user) {
            return [ //ここを編集する
            "user" => $user
            ];
        }else{
            abort(401);
        }
    }

    //privates
    //メールが存在するか
    private function isMailExists($email){​​​​​​​ //bool
        return DB::table('users')->where('email', $email)->exists();
    }​​​​​​​
   
    //トークンが存在するか
    private function isTokenExists($token){​​​​​​​ //bool
        return DB::table('users')->where('token', $token)->exists();
    }​​​​​​​
   
    //トークンが有効かどうか
    private function isTokenValid($token){​​​​​​​
        $user = User::where('token', $token)->first();
        $carbon_expire = $user->token_expired_at;
        $carbon_now = Carbon::now('Asia/Tokyo');
        return  $carbon_expire->gt($carbon_now);
    }​​​​​​​
   
    //ユーザーが存在するかどうか(id->bool)
    private function isUserExists($id){​​​​​​​ //bool
        return DB::table('users')->where('id', $id)->exists();
    }​​​​​​​
   
    //トークンを持ったユーザーを検索
    private function getTokenUser($token){​​​​​​​ //user
        return User::where('token', $token)->first();
    }​​​​​​​
   
    //ユーザーを取得(id->user)
    private function getUser($id){​​​​​​​ //user
        return User::where('id', $id)->first();
    }​​​​​​​

}