#pragma strict

public var damage : int = 20;

function Start () {
	rigidbody.AddForce (transform.forward * 500.0F);
}
