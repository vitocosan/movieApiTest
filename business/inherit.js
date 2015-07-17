// It's a good idea to have a utility class to wire up inheritance.

  var inherit = function inherit(cls, superCls) {
      // We use an intermediary empty constructor to create an
      // inheritance chain, because using the super class' constructor
      // might have side effects.
      var construct = function () {};
      construct.prototype = superCls.prototype;
      cls.prototype = new construct;
      cls.prototype.constructor = cls;
      cls.super = superCls;
  };

module.exports = inherit;
