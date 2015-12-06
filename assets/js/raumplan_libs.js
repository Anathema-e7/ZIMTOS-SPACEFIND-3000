
var LIBS={
  degToRad: function(angle){
    return(angle*Math.PI/180);
  },

  get_projection: function(angle, a, zMin, zMax) {
    var tan=Math.tan(LIBS.degToRad(0.5*angle)),
        A=-(zMax+zMin)/(zMax-zMin),
          B=(-2*zMax*zMin)/(zMax-zMin);

    return [
      0.5/tan, 0 ,   0, 0,
      0, 0.5*a/tan,  0, 0,
      0, 0,          A, -1,
      0, 0,          B, 0
    ];
  },

  get_I4: function() {
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  },

  set_I4: function(m) {
    m[0]=1, m[1]=0, m[2]=0, m[3]=0,
      m[4]=0, m[5]=1, m[6]=0, m[7]=0,
      m[8]=0, m[9]=0, m[10]=1, m[11]=0,
      m[12]=0, m[13]=0, m[14]=0, m[15]=1;
  },

  rotateX: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv1=m[1], mv5=m[5], mv9=m[9];
    m[1]=m[1]*c-m[2]*s;
    m[5]=m[5]*c-m[6]*s;
    m[9]=m[9]*c-m[10]*s;

    m[2]=m[2]*c+mv1*s;
    m[6]=m[6]*c+mv5*s;
    m[10]=m[10]*c+mv9*s;
  },

  rotateY: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]+s*m[2];
    m[4]=c*m[4]+s*m[6];
    m[8]=c*m[8]+s*m[10];

    m[2]=c*m[2]-s*mv0;
    m[6]=c*m[6]-s*mv4;
    m[10]=c*m[10]-s*mv8;
  },

  rotateZ: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]-s*m[1];
    m[4]=c*m[4]-s*m[5];
    m[8]=c*m[8]-s*m[9];

    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
  },

  translateZ: function(m, t){
    m[14]+=t;
  },
  
    cube_coordinates: function() {
    return [
    -3,-1,-1,     1,1,0,                                                        //(x,y,z) (r,g,b)
    -1,-1,-1,     1,1,0,                                                         //rear quadrat
    -1, -.8,-1,     1,1,0,
    -3, -.8,-1,     1,1,0,

    -3,-1, 1,     0,0,1,                                                        //front quadrat
    -1,-1, 1,     0,0,1,
    -1, -.8, 1,     0,0,1,
    -3, -.8, 1,     0,0,1,

    -3,-1,-1,     0,1,1,                                                        //left quadrat
    -3, -.8,-1,     0,1,1,
    -3, -.8, 1,     0,1,1,
    -3, -1, 1,     0,1,1,

    -1,-1,-1,     1,0,0,                                                         //right quadrat
    -1, -.8,-1,     1,0,0,
    -1, -.8, 1,     1,0,0,
    -1,-1, 1,     1,0,0,

    -3,-1,-1,     1,0,1,                                                        //bottom quadrat
    -3,-1, 1,     1,0,1,
    -1,-1, 1,     1,0,1,
    -1,-1,-1,     1,0,1,

    -3, -.8,-1,     0,1,0,                                                      //top quadrat
    -3, -.8, 1,     0,1,0,
    -1, -.8, 1,     0,1,0,
    -1, -.8,-1,     0,1,0,
    
     1,-1,-1,     1,1,0,                                                        //(x,y,z) (r,g,b)
     3,-1,-1,     1,1,0,                                                        //rear quadrat
     3, -.8,-1,     1,1,0,
     1, -.8,-1,     1,1,0,

     1,-1, 1,     0,0,1,                                                        //front quadrat
     3,-1, 1,     0,0,1,
     3, -.8, 1,     0,0,1,
     1, -.8, 1,     0,0,1,

     1,-1,-1,     0,1,1,                                                        //left quadrat
     1, -.8,-1,     0,1,1,
     1, -.8, 1,     0,1,1,
     1, -1, 1,     0,1,1,

     3,-1,-1,     1,0,0,                                                        //right quadrat
     3, -.8,-1,     1,0,0,
     3, -.8, 1,     1,0,0,
     3,-1, 1,     1,0,0,

     1,-1,-1,     1,0,1,                                                        //bottom quadrat
     1,-1, 1,     1,0,1,
     3,-1, 1,     1,0,1,
     3,-1,-1,     1,0,1,

     1, -.8,-1,     0,1,0,                                                      //top quadrat
     1, -.8, 1,     0,1,0,
     3, -.8, 1,     0,1,0,
     3, -.8,-1,     0,1,0

  ];
  },
  
  cube_faces: function(){
    return [
    0,1,2,                                                                      //first cube
    0,2,3,

    4,5,6,
    4,6,7,

    8,9,10,
    8,10,11,

    12,13,14,
    12,14,15,

    16,17,18,
    16,18,19,

    20,21,22,                                                                   
    20,22,23,
    
    24,25,26,                                                                   //second cube
    24,26,27,
    
    28,29,30,
    28,30,31,
    
    32,33,34,
    32,34,35,
    
    36,37,38,
    36,38,39,
    
    40,41,42,
    40,42,43,
    
    44,45,46,
    44,46,47

  ];
  }
  
};
