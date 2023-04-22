<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>List of products</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    @vite('resources/css/app.css')


</head>

<body class="antialiased">
    <div
        class="relative sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">

        <h1 class="font-900 text-4xl bg-white w-full text-center mt-4 py-4">List of Products</h1>
        <div class="max-w-7xl mx-auto p-6 lg:p-8">

            <div class="relative w-48 ml-auto">
                <input type="checkbox" id="showbox" class="hidden absolute">
                <label for="showbox" class="flex items-center space-x-1 cursor-pointer">
                    <span class="text-lg">show By</span>
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </label>
                <div id="showboxmenu"
                    class="absolute mt-1 top-full min-w-max shadow rounded opacity-0 bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10">
                    <ul class="block text-gray-900" style="min-width:100px">
                        <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer">
                            <a href="/laravel_interview/4" class="block  hover:bg-gray-200 px-3 py-2">4</a>                            
                        </li>
                        <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer">
                            <a href="/laravel_interview/8" class="block  hover:bg-gray-200 px-3 py-2">8</a>                                 
                        </li>
                        <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer">
                            <a href="/laravel_interview/12" class="block  hover:bg-gray-200 px-3 py-2">12</a>                                 
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-4">
                @if (count($products) > 0)
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        @foreach ($products as $product)
                            <a href=""
                                class="scale-100 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div class="w-full d-grid p-6">
                                    <div class="h-full">
                                        @if (!empty($product->image))
                                            <img class="w-full" style="min-height:8rem; max-height:10rem"
                                                
                                                src="{{ str_starts_with($product->image, 'https') ? $product->image : `'/storage/images/products/'.$product->image` }} "
                                                
                                                 alt="{{ $product->name }}">
                                        @else
                                            <img class="w-full" style="min-height:8rem; max-height:10rem"
                                                src="/no_product_image.jpg" alt="{{ $product->name }}">
                                        @endif
                                        <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">{{ $product->name }}</div>
                                            <div class="d-flex">
                                                <span
                                                    class="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">GHC
                                                </span>
                                                <span class="font-bold text-gray-900">{{ $product->amount }}</span>
                                            </div>
                                        </div>
                                        <div class="px-6 pt-4 pb-2 text-right">
                                            {{ \Carbon\Carbon::parse($product->created_at)->format('j F, Y') }}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        @endforeach
                    </div>
                    <div class="mt-4 pagination">
                        {{ $products->links()}}
                    </div>
                    @else
                    <div class="w-full text-center rounded overflow-hidden shadow-lg py-8 px-4 bg-white">
                        <p class="font-700 text-2xl capitalize">No products availbale</p>
                    </div>
                    @endif
            </div>


            {{-- add a product --}}
            <!-- component -->
            <div class="py-8 mt-8 bg-gray-10">
                <h2 class="text-center py-2 bg-white text-3xl font-600">Add New Product</h2>
                <div class="container max-w-screen-lg mx-auto">
                    <div class="bg-white rounded shadow-lg p-4 px-4 md:px-8 mb-6">
                        @if ($errors->any())
                            {!! implode('', $errors->all('<div class="text-red-400">:message</div>')) !!}
                        @endif
                        <form action="/laravel_interview" method="POST" enctype="multipart/form-data">
                            @csrf

                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-4">
                                <div class="lg:col-span-3">
                                    <div class="grid gap-8 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-5">
                                            <label for="name">Name</label>
                                            <input type="text" name="name" id="name"
                                                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value="{{ old('name') }}" />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Image</label>
                                            <input type="file" name="image" id="image"
                                                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value="{{ old('image') }}" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="amount">Amount</label>
                                            <input type="number" name="amount" id="amount"
                                                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value="{{ old('amount') }}" />
                                        </div>

                                    </div>


                                    <div class="md:col-span-5 mt-4 text-right">
                                        <div class="inline-flex items-end">
                                            <button type="submit"
                                                class="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>


</html>
