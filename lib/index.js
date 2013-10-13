
function partial( argIndices, argValues, fn ) {

  var argc = arguments.length;
  switch( argc ) {
  case 1:
    var values = argIndices;
    Array.isArray( values ) || ( values = [ values ] );
    var indices = values.map( function( x, i ) {
      return i;
    } );
    return partial( [ 0, 1 ], [ indices, values ], partial );
    break;
  case 2:
    return function( fn ) {
      return partial( argIndices, argValues, fn );
    }
    break;
  case 3:
    if ( typeof fn !== 'function' ) {
      throw new Error( 'partial: third argument must be function!' );
    }

    var _args = [];
    Array.isArray( argIndices ) || ( argIndices = [ argIndices ] );
    Array.isArray( argValues ) || ( argValues = [ argValues ] );
    argIndices.forEach( function( i, ind ) {
      _args[ i ]  = argValues[ ind ];
    } );

    return function() {
      var args =  Array.prototype.slice.call( arguments );
      var ind = 0;

      while ( args.length > 0 ) {
        arg = args.shift();
        while ( typeof _args[ ind ] !== 'undefined' ) {
          ind++;
        }
        _args[ ind ] = arg;
      }

      return fn.apply( null, _args );
    };
    break;
  default:
    throw new Error( 'partial: not valid number of arguments!' );
  }
}

module.exports = exports = partial;
