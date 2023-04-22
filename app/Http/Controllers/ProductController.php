<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //paginate list of products
    public function products($perPage = null)
    {
        $per = $perPage ? $perPage : 10;
        $products = Product::simplePaginate($per);

        return view('products')->with(['products' => $products]);
    }


    //paginate list of products
    public function productsApi($perPage)
    {
        $per = $perPage ? $perPage : 10;
        $products = Product::paginate($per);

        return response()->json(['products' => $products]);
    }





    //save product into database
    public function store(Request $request)
    {
        //validate request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image',
            'amount' => 'required|decimal:0,2|max:1000000',
        ]);

        if ($validator->fails()) {
            return redirect('laravel_interview')
                ->withErrors($validator)
                ->withInput();
        }

        //check if image is selected
        if ($request->file('image')) {
            // if ($request->hasFile('image')) {

            //Get file name with Extension
            $filenameWithExt = $request->file('image')->getClientOriginalName();

            //Get just the file name
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //Get just the Extension
            $extension = $request->file('image')->getClientOriginalExtension();

            //File name to store
            $filenameToStore = $filename . '_' . time() . '.' . $extension;

            //get file path
            $path = $request->file('image')->storeAs('public/images/products', $filenameToStore);
        }

        $product_image = '';
        if ($request->file('image')) {
            $product_image = $filenameToStore;
        }

        $product = Product::create([
            'name' => $request->name,
            'image' => $product_image,
            'amount' => $request->amount,
        ]);

        if ($product) {
            return redirect('laravel_interview')
                ->with(['message' => 'Product Created Succesfully']);
        } else {
            return redirect('laravel_interview')
                ->withErrors('Something went wrong');
        }
    }


    //save product into database
    public function storeApi(Request $request)
    {
        //validate request
        $validator= Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image',
            'amount' => 'required|decimal:0,2|max:1000000',
        ]);
        /* return response()->json(['guy', $request->all()]); */


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid inputs',
                'errors' => $validator->errors()
            ], 402);
        }

        //check if image is selected
        if ($request->file('image')) {
            // if ($request->hasFile('image')) {

            //Get file name with Extension
            $filenameWithExt = $request->file('image')->getClientOriginalName();

            //Get just the file name
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //Get just the Extension
            $extension = $request->file('image')->getClientOriginalExtension();

            //File name to store
            $filenameToStore = $filename . '_' . time() . '.' . $extension;

            //get file path
            $path = $request->file('image')->storeAs('public/images/products', $filenameToStore);
        }

        $product_image = '';
        if ($request->file('image')) {
            $product_image = $filenameToStore;
        }

        $product = Product::create([
            'name' => $request->name,
            'image' => $product_image,
            'amount' => $request->amount,
        ]);

        if ($product) {
            return response()->json(['message' => 'Product Created Succesfully']);
        } else {
            return response()->json(['message' => 'Something went wrong']);
        }
    }
}
