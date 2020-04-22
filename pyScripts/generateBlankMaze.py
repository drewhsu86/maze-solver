# generate a blank maze
# after asking for width, height from user
# the border of the maze is all 1's
# the inside is all zeros
# the user will copy paste and add 2 and 3
# which are the entrance and exit

validInput = False
dims = [0, 0]
while validInput == False:
    width = input('Enter a width (int): ')
    height = input('Enter a height (int): ')
    if int(width) > 0 and int(height) > 0:
        print(width, height, 'accepted')
        dims[0] = int(width)
        dims[1] = int(height)
        validInput = True
# make a nested array of arrays
# first and last row is all ones
# middle arrays, only first and last element are ones
results = []
for i in range(dims[1]):
    filler = 0
    if i == 0 or i == dims[1] - 1:
        filler = 1
    subArr = []
    for j in range(dims[0]):
        if j == 0 or j == dims[0] - 1:
            subArr.append(1)
        else:
            subArr.append(filler)
    results.append(subArr)
print(results)
print('Please copy paste the above.')
