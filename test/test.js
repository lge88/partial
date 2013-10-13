
var partial = require( 'partial' );
var expect = require( 'expect.js' );

describe( 'partial', function() {

  it( '3 arguments', function() {
    function foo( a, b, c, d ) {
      return ( a + b ) * ( c - d );
    }

    var fooPartial1 = partial( 0, 3, foo );
    var fooPartial2 = partial( [ 0 ], [ 3 ], foo );
    var fooPartial3 = partial( 1, 3, foo );
    var fooPartial4 = partial( [ 0, 2 ], [ 3, 4 ], foo );
    var fooPartial5 = partial( [ 4, 3 ], [ 1, 0 ], foo );
    var fooPartial6 = partial( 4, 3, foo );
    var fooPartial7 = partial( [ 0, 1, 2, 3 ], [ 1, 2, 3, 4 ], foo );

    expect( fooPartial1( 1, 3, 2 ) ).to.equal( foo( 3, 1, 3, 2 ) );
    expect( fooPartial2( 1, 3, 2 ) ).to.equal( foo( 3, 1, 3, 2 ) );
    expect( fooPartial3( 1, 3, 2 ) ).to.equal( foo( 1, 3, 3, 2 ) );
    expect( fooPartial4( 1, 2 ) ).to.equal( foo( 3, 1, 4, 2 ) );
    expect( fooPartial5( 1, 3, 2 ) ).to.equal( foo( 1, 3, 2, 0 ) );
    expect( isNaN( fooPartial6( 1, 3, 2 ) ) ).to.equal( true );
    expect( fooPartial7() ).to.equal( foo( 1, 2, 3, 4 ) );

  } );

  it( '2 arguments', function() {
    function foo( a, b, c, d ) {
      return ( a + b ) * ( c - d );
    }

    var assignArgs1 = partial( 0, 1 );
    var assignArgs2 = partial( [ 0, 1, 2 ], [ 1, 2, 3 ] );
    var assignArgs3 = partial( [ 0, 1, 2, 3 ], [ 1, 2, 3, 4 ] );
    var assignArgs4 = partial( [ 4, 1, 2, 0, 3 ], [ 5, 4, 3, 2, 1 ] );
    var fooPartial1 = assignArgs1( foo );
    var fooPartial2 = assignArgs2( foo );
    var fooPartial3 = assignArgs3( foo );
    var fooPartial4 = assignArgs4( foo );

    expect( fooPartial1( 2, 3, 4 ) ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial2( 4 ) ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial3() ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial4() ).to.equal( foo( 2, 4, 3, 1 ) );
  } );

  it( '1 arguments', function() {
    function foo( a, b, c, d ) {
      return ( a + b ) * ( c - d );
    }

    var _ = void 0;
    var assignArgs1 = partial( 1 );
    var assignArgs2 = partial( [ 1, 2, 3 ] );
    var assignArgs3 = partial( [ 1, 2, 3, 4 ] );
    var assignArgs4 = partial( [ 1, 2, 3, 4, 5 ] );
    var assignArgs5 = partial( [ 1, _, _, 4 ] );

    var fooPartial1 = assignArgs1( foo );
    var fooPartial2 = assignArgs2( foo );
    var fooPartial3 = assignArgs3( foo );
    var fooPartial4 = assignArgs4( foo );
    var fooPartial5 = assignArgs5( foo );

    expect( fooPartial1( 2, 3, 4 ) ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial2( 4 ) ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial3() ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial4() ).to.equal( foo( 1, 2, 3, 4 ) );
    expect( fooPartial5( 2, 3 ) ).to.equal( foo( 1, 2, 3, 4 ) );
  } );

} );
