<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>List of products</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <script src="https://kit.fontawesome.com/57edecee41.js" crossorigin="anonymous"></script>
    @vite('resources/css/app.css')


</head>

<body class="antialiased">
    <div
        class="relative sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">

        <div class="py-8 mt-8 bg-gray-10">
            <h2 class="text-center py-2 text-3xl font-600">Update product</h2>
            <div class="container max-w-screen-lg mx-auto">
                <div class="bg-white rounded shadow-lg p-4 px-4 md:px-8 mb-6">
                    @if ($errors->any())
                        {!! implode('', $errors->all('<div class="text-red-400">:message</div>')) !!}
                    @endif
                    <form action="/laravel_interview/update/{{ $product->id }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-4">
                            <div class="lg:col-span-3">
                                <div class="grid gap-8 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div class="md:col-span-5">
                                        <label for="name">Name</label>
                                        <input type="text" name="name" id="name"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value="{{ old('name', $product->name) }}" />
                                    </div>

                                    <div class="md:col-span-5">
                                        <label for="image">Image</label>
                                        <input type="file" name="image" id="image"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value="{{ old('image', $product->image) }}" />
                                    </div>

                                    <div class="md:col-span-2">
                                        <label for="amount">Amount</label>
                                        <input type="number" name="amount" id="amount"
                                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value="{{ old('amount', $product->amount) }}" />
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
