_satellite.pushBlockingScript(function(event, target, $variables){
  window.trackAlive=function(){}
try{
		window.trackAlive=function(trackEvent){
      _satellite.setVar('documentReadyState', document.readyState)
      if(document.readyState=='interactive'){
        _satellite.setVar('documentReadyState','WILEY not defined');
        if(window.WILEY){
          _satellite.setVar('documentReadyState','WILEY is defined');
          if(WILEY.require){
						_satellite.setVar('documentReadyState','Require JS loaded');
            if (WILEY.require.defined("common/modules/events")){
               _satellite.setVar('documentReadyState','AA JS Loaded'); 
            }
          }
        }
      }
      
			_satellite.track(trackEvent);
		}
		setTimeout(function(){trackAlive('10secondsin');},10000);
		setTimeout(function(){trackAlive('30secondsin');},30000);
		setTimeout(function(){trackAlive('90secondsin');},90000);
}
catch(e){}

});
