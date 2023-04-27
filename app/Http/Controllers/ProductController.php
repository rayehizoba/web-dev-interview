<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //paginate list of products
    public function products($perPage = 10)
    {
        $sort =  request('sort');
        if($sort === 'name_ASC'){
            $products = Product::orderBy('name', 'asc')->simplePaginate($perPage);
        }
        elseif($sort === 'name_DESC'){
            $products = Product::orderBy('name', 'desc')->simplePaginate($perPage);
        }
        elseif($sort === 'amount_ASC'){
            $products = Product::orderBy('amount', 'asc')->simplePaginate($perPage);
        }
        elseif($sort === 'amount_DESC'){
            $products = Product::orderBy('amount', 'desc')->simplePaginate($perPage);
        }
        elseif($sort === 'date_latest'){
            $products = Product::latest()->simplePaginate($perPage);
        }
        elseif($sort === 'date_oldest'){
            $products = Product::oldest()->simplePaginate($perPage);
        }
        else{
            $products = Product::latest()->simplePaginate($perPage);
        }

        return view('products')->with(['products' => $products]);
    }


    //paginate API list of products
    public function productsApi($perPage = 10)
    {
        $sort =  request('sort');
        if($sort === 'name_ASC'){
            $products = Product::orderBy('name', 'asc')->paginate($perPage);
        }
        elseif($sort === 'name_DESC'){
            $products = Product::orderBy('name', 'desc')->paginate($perPage);
        }
        elseif($sort === 'amount_ASC'){
            $products = Product::orderBy('amount', 'asc')->paginate($perPage);
        }
        elseif($sort === 'amount_DESC'){
            $products = Product::orderBy('amount', 'desc')->paginate($perPage);
        }
        elseif($sort === 'date_latest'){
            $products = Product::latest()->paginate($perPage);
        }
        elseif($sort === 'date_oldest'){
            $products = Product::oldest()->paginate($perPage);
        }
        else{
            $products = Product::latest()->paginate($perPage);
        }
        

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


    //save API product into database
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



    //delete a produc
    public function destroy($id){
        $product = Product::findOrFail($id);
        
        $product->delete();

        return redirect()->route('products')
        ->with('delete_message', 'Product has been deleted successfully.');
    }
    public function destroyApi($id){
        $product = Product::findOrFail($id);
        
        $product->delete();

        return response()->json(['delete_message', 'Product has been deleted successfully.']);
    }



    public function edit($id){
        $product = Product::findOrFail($id);

        return view('edit_product')
        ->with('product', $product);
    }

    public function update(Request $request, $id){

        //validate request
        $validator = Validator::make($request->all(), [
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

        $product = Product::findOrFail($id);

        if($product){
            $product->update([
                'name' => $request->name,
            'image' => $product_image,
            'amount' => $request->amount,
            ]);
        }

        return redirect()->route('products')
        ->with('update_message', 'Product has been updated successfully.');
    }

    public function updateApi(Request $request, $id){

        //validate request
        $validator= Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image' => 'nullable|image',
            'amount' => 'required|decimal:0,2|max:1000000',
        ]);
        //return response()->json(['guy', $request->all()]);


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

        $product = Product::findOrFail($id);

        if($product){
            $product->update([
                'name' => $request->name,
            'image' => $product_image,
            'amount' => $request->amount,
            ]);
        }

        if ($product) {
            return response()->json(['message' => 'Product Updated Succesfully']);
        } else {
            return response()->json(['message' => 'Something went wrong']);
        }
    }

}
