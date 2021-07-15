# π approximator

A little script I made to approximate π in what I think is a nice visual way.

It works by generating random points inside the area of a square and then comparing,
how many landed within half the length of its edge from its center as opposed to the total amount.

Since the area of the circle is πr<sup>2</sup> and area of the square is 4r<sup>2</sup> the
probability *P* of a point being inside the circle is:

*P = πr<sup>2</sup>/4r<sup>2</sup> = π/4*

We can approximate *P* by dividing the amount of points inside the circle by the total number of points.
And since *π = 4P* we can now also approximate π!

It's slow af though... oh well.
