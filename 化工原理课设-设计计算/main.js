function func(){
  
  /*后台*/console.log('---进入后台--- :) ');
  //获取输入的参数值
  var ji	  =document.getElementsByClassName('ji'),
    canshu=document.getElementsByClassName('can'),
    xueHao=canshu[0].value,
    t_2=canshu[1].value,
    k_0=canshu[2].value,
    t_w=canshu[3].value,
    d_0=canshu[4].value,
    l  =canshu[5].value, 
    t  =canshu[6].value,
    b_ =canshu[7].value;
  /*后台*/console.log('学号校验：'+(xueHao>0&&xueHao<=28)+' :) ');
  var N=0;
  function write(string,value){
    console.log(N+string+value);
    ji[N++].textContent=N+'.'+string+value;
    
  }
  

/*化工原理课设计算 内核*/
/*-------------------------------------------------------*/

//已知条件：

  var w_h=(500+50*xueHao)/3600;  
  var mmHg=185;		//真空度 185mmHg
  var t_1=20;t_2;   //进水温度t_1:20 出水温度t_2:28

//一、计算s_0_chu的值：

  //1.计算绝压  2.查表P340得出饱和蒸汽的汽化热 r=2.27925  
    var r=2.27925e6;		//饱和蒸汽的汽化热 
    var t_s=91.55;			//蒸汽对应的温度
    write('查表得r=',r);
    write('Ts=',t_s);  
    
    
  //计算Q_youxiao
    var Q_youxiao=0.95*w_h*r;	//Q有效
    write('Q有效值：',Q_youxiao);     //1.0228e6
    
    
  //计算A_t_m的值
    var A_t_1=t_s-t_2,
      A_t_2=t_s-t_1;	
    var A_t_m=(A_t_2-A_t_1)/(Math.log(A_t_2/A_t_1));
    write('A_t_m的值:',A_t_m);
    
    
  //k_0的初值是1500
    k_0; 
    t_w;
  var s_0_chu=(Q_youxiao/(k_0*A_t_m));     //s0初值计算
  write('S0初的值：',s_0_chu);    				//17.104

//二、选列管尺寸    //30	1260	79	25	3000	35	27	

  //管子直径：38X2.5mm  (自选尺寸)
      d_0=d_0*1e-3;
    var b=2.5e-3,d_i=d_0-2*b,d_m=(d_0+d_i)/2;
  //管长的选用  3000mm=3m
    l=l*1e-3;		//1500/2000/3000/4500/6000/9000
  //管心距 t 的值 t=(1.3~1.5)d0 > (d0+b)      b=2.5*2
    t=t*1e-3;b_=b_*1e-3;

//三、管程数（m）

  //根据t1 t2 的平均温度查表 P338 c_pc
    var c_pc=4.1785e3;
  var w_h2o=Q_youxiao/(c_pc*(t_2-t_1));	
  write('W_H2O的值：',w_h2o);
  //计算  L有效
    var l_youxiao=l-2*25e-3-2*5e-3;  //管板厚25mm  伸长量5mm
    write('L有效:',l_youxiao);		//2940mm=2.94m
  //计算 n初   n_chu
    var n_chu=s_0_chu/(3.1415*d_0*l_youxiao);
    write('管子数：',n_chu);
    n_chu=Math.floor(n_chu);
    write('圆整后的管子数：',n_chu);
  //计算速度 ui
    var u_i=w_h2o/(1000*3.1415/4*d_i*d_i*n_chu);
    write('速度ui:',u_i);
  
  var m=1/u_i;
  write('m=',m);
  m=Math.ceil(m);
  if(m==1){
    write('圆整后 m=1,换热器为单程.','');
  }else if(m==2){
    write('圆整后 m=2,换热器为双程.','');
  }

//四、换热器壳体内径  Di

  //计算n_c的值  (管子排列选为：正三角形排列)
    var n_c=1.1*Math.sqrt(n_chu);
    write('计算的n_c值：',n_c);
    n_c=Math.round(n_c);				/*******特殊+1处理********/
    write('圆整之后n_c的值：',n_c);
  //计算Di的值
    var D_i=((t*(n_c-1))+(2*b_));
    write('换热器壳体内径Di=',D_i);
    //write('竖列的长度校核：',(Math.sqrt(3)*t*(n_c-1))+(2*b_))
    if(D_i<350){   //**************有待优化
      D_i=325;
    }else if(D_i<450){
      D_i=400;
    }else if(D_i<550){
      D_i=500;
    }else if(D_i<650){
      D_i=600;
    }
    write('查表后  换热器壳体内径Di=',D_i);
  // L/Di 的值
    write('L/Di的值',(l_youxiao*1e3/D_i));

//五、确定准确管子数  n_zhun  并得出速度的准确值

  //笔动确定准确管子数
    var n_zhun=n_chu;
    var u_zhun=u_i;
  //每程的管子数 n_cheng
    var n_cheng=Math.ceil(n_zhun/m)
    write('每程的管子数是：',n_cheng);
    n_zhun=n_cheng*m;
    write('准确的管子数n_zhun=',n_zhun);
                                                      
//六、校核计算

  //查表（课设书）P88 表7-8
  /*管内污垢热阻R_si   管外污垢热阻R_so*/
    var R_si=1.7e-4,R_so=8.6e-5;
  //下边的值都是在25摄氏度左右的已定数据 
    var la_m=60.825e-2,
      p_midu=996.95,
      lv=90.29e-5,
      Pr=6.215;
    var Re=(d_i*u_zhun*p_midu/lv);
  //管内传热系数 a_i
    var a_i=0.023*la_m/d_i*Math.pow(Re,0.8)*Math.pow(Pr,0.4);
    write('管内传热系数 a_i的值：',a_i);
  //k_0的计算函数
    function fun_K_0(a_0,a_i){
      //，在需要时可以把外部变量屏蔽（注：la_m 的值）
      var la_m=45;//(固定值45)
      var k_=d_0/(d_i*a_i)+(R_si*d_0/d_i)+b*d_0/(la_m*d_m)+R_so+(1/a_0);
      var K_0=Math.pow(k_,-1);
      return K_0;
    }
  
  //a_0的计算函数
    function fun_a_0(n_m,t_w){
      /*固定量*/var g=9.81,A_t=t_s-t_w;
      var a_sp=g*Math.pow(p_midu,2)*Math.pow(la_m,3)*r,
        a_sb=d_0*lv*Math.pow(n_m,(2/3))*A_t;
      var a_=a_sp/a_sb;
      var a_0=0.725*Math.pow(a_,0.25);
      return a_0;
    }
  //n_m的计算函数  参数为任意长度的n的值
    function fun_n_m(a_){
      var length=a_.length;
      var n_sub=0,n_sup=0;
      
      for(i=0;i<length;i++){
        n_sup+=a_[i];
        n_sub+=Math.pow(a_[i],0.75)
      }
      var n_m=Math.pow((n_sup/n_sub),4);
      return n_m;
    }
  //每竖列所排的管子数
    var a=[]; 
    function fun_n(n,m){
      /*一定要确保n<m,否则....*/
      var i=0,j=0,k=0;
      var n_=(2*n-1),sum=n;		//(调试值)  n_=11  sum=6
      //设置初始值10101010101
      for(i=0;i<n_;i++){	
        a[i]=1;
        i++;
        if(i<n_) a[i]=0;
      } 
      
      //设定循环
      for(j=1;j<n;j++){
        i=j,n_--;
        for(i;i<n_;i+=2){
          a[i]++;
          sum++;
          if(sum==m) return; 
          a[i]++;
          sum++;
          if(sum==m) return; 
        }
      }
      
    }
  /*
   * 
   *   O O O O O O	6	
   *    O O O O O		5
   *     O O O O		4
   *      O O O		3
   *       O O		2
   */
    //单程 28 1,2,3,4,3,2,3,4,3,2,1
    //单程 30 1,2,3,4,3,4,3,4,3,2,1
    //单程 32 
    fun_n(n_c,n_zhun);
    write("使用正三角形方法排管：",'')
    write('',a);
    write('上面的排管是竖列管子数，需要动手画一下看是否可以排的下。','');
    var n_m=fun_n_m(a);
    write('n_m=',n_m);
  //计算出a_0的值
    
    var a_0=fun_a_0(n_m,t_w);
    write('a_0=',a_0);
  //第一次计算出K_0的值
    var K_0=fun_K_0(a_0,a_i);
    write('K_0=',K_0);
  //t_w的校核
    var t_w_=t_s-(Q_youxiao/(s_0_chu*a_0));
    write('t_w=',t_w_)
    var t_w_jiao=Math.abs(t_w_-t_w);
    write('t_w的校核值：',t_w_jiao);
    if(t_w_jiao<=1){
      write('t_w校核成功','');
    }else{
      write('t_w校核尚未成功','');
    }
  //k0的再次计算
    var A_t=t_s-t_w_;
    write('A_t=',A_t);
    var a_0=fun_a_0(n_m,t_w_);
    write('a_0=',a_0);
    var K_0=fun_K_0(a_0,a_i);
    write('K_0=',K_0);

  //k0的校核
  //1.1~1.25  k_计算值/k_自取值
    var K_jiao=K_0/k_0;
    write('K_0的校核值：',K_jiao);
    if(K_jiao>=1.1&&K_jiao<=1.25){
      write('k0校核成功','');
    }else{
      write('k0校核尚未成功','');
    }
    
  //校核S0的值
    //S0的计算值
    var s_0=Q_youxiao/(K_0*A_t_m);
    write('s_0=',s_0);
    //S0的设备值
    var s_0_she=3.1415*l_youxiao*n_zhun*d_0;
    var s_0_jiao=s_0_she/s_0;
    write('s_0的设备值：',s_0_she);
    write('s_0的校核值：',s_0_jiao);
    if(s_0_jiao>=1.1&&s_0_jiao<=1.25){
      write('s_0校核成功','');
    }else{
      write('s_0校核尚未成功','');
    }
}