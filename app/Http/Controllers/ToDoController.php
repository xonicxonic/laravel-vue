<?php

namespace App\Http\Controllers;

use Auth;
use App\ToDo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ToDoController extends Controller
{
    public function index(){

        $todos = ToDo::all()->where('user_id', Auth::id());

        return response()->json([
            'status' => 'success',
            'todos' => $todos->toArray()
        ], 200);

    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'error' => 'registration_validation_error',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo = new ToDo([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'user_id' => Auth::id()
        ]);

        $todo->save();

        return response()->json('success');
    }

    public function update($id, Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'error' => 'registration_validation_error',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo = ToDo::find($id);

        $todo->update($request->all());

        return response()->json('successfully updated');
    }

    public function delete($id){
      $todo = ToDo::find($id);

      $todo->delete();

      return response()->json('successfully deleted');
    }
}
