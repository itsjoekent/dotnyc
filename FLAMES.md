   n−1
S = U Fi(S)
   i=0

Fi(x, y) = (aix + biy + ci, dix + eiy + fi)

F0(x, y) = (x/2, y/2)
F1(x, y) = (x+1 / 2, y/2)
F2(x, y) = (x/2, y + 1/2)

The normal algorithm for solving for S is called the chaos game. In pseudocode it is:

(x, y) = a random point in the bi-unit square

iterate {
  i = a random integer from 0 to n − 1 inclusive
  (x, y) = Fi(x, y)
  plot(x, y) except during the first 20 iterations
}

The bi-unit square are those points where x and y are both in [-1,1].

In fractal flames, the number of samples is specified with the more abstract parameter quality, or samples per output pixel. That way the image quality (in the sense of lack of noise) remains constant in face of changes to the image resolution and the camera.

It is useful to be able to weight the functions so they are not chosen with equal frequency in line 3 of the chaos game. We assign a weight, or relative probability wi to each function Fi. This allows interpolation between function systems with different numbers of functions: the additional functions can be phased in by starting their weights at zero. Differently weighted functions are also necessary to draw symmetric flames as shown in Section 7.

Fi(x, y) = Vj (aix + biy + ci, dix + eiy + fi)

We call each such function Vj a variation, and each one changes the shape and character of the solution in a recognizable way

V2(x, y) = 1/r^2 · (x, y) spherical

r = sqrt(x^2 + y^2)

An example of a dependent variation is Popcorn, V17, which is dependent on the c and f coefficients of the affine transform.

The PDJ variation, V24, is an example of a parametric variation. PDJ relies on four external parameters (p1, p2, p3, p4) to fully characterize its behaviour
