#pragma strict

public var sparkEffect : GameObject;

function OnCollisionEnter(Coll : Collision) {
	if (Coll.gameObject.tag == "BULLET") {
		Instantiate(sparkEffect, Coll.transform.position, Coll.transform.rotation);
		Destroy( Coll.gameObject );
	}
}