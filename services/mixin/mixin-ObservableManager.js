//separacion de funcionalidad, mixin para la declaracion de observers del anterior archivo(SaveprojectManager)

const ObservableMixin = {
    _observers: null,
  
    _initObservable() {
      this._observers = [];
    },
  
    subscribe(observerCallback) {
      if (!this._observers) this._initObservable();
      if (observerCallback && !this._observers.includes(observerCallback)) {
        this._observers.push(observerCallback);
      }
    },
  
    unsubscribe(observerCallback) {
      if (!this._observers) return;
      this._observers = this._observers.filter(obs => obs !== observerCallback);
    },
  
    _notifyObservers(...args) {
      if (!this._observers) return;
      this._observers.forEach(observer => {
        if (typeof observer === 'function') {
          observer(...args);
        } else if (observer && typeof observer.update === 'function') {
          observer.update(...args);
        }
      });
    }
  };