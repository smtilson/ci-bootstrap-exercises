def even_num_of_evens(nums):
    if not isinstance(nums,list):
        raise TypeError(f"A list must be passed not a {type(nums)}.")
    evens = len([num for num in nums if num%2 == 0])
    return evens % 2 == 0 and evens != 0