import './greeting.css';

function Greeting({name}) {

  return (
    <div className="animated-text">Hello{name ? " " + name.split(" ")[0] + "!" : "!"}</div>
  );
}

export default Greeting;
