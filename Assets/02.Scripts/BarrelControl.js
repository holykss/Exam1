#pragma strict

public var hitCount : int = 0;
public var sparkEffect : GameObject;
public var sparkEffectForBarrel : GameObject;


function OnCollisionEnter (Coll : Collision) {
	if (Coll.gameObject.tag == "BULLET")
	{
		Instantiate(sparkEffect, Coll.transform.position, Coll.transform.rotation);
		Destroy(Coll.gameObject);

		++hitCount;
		if (hitCount >= 3)
		{
			expBarrel();
		}
	}

}

function expBarrel () {
	gameObject.AddComponent(Rigidbody);
	Instantiate(sparkEffectForBarrel, transform.position, transform.rotation);
	
	// 필요할때에 물리 엔진 요소를 넣어준다.
	//gameObject.rigidbody.AddForce(Vector3.up * 100.0F);
	
	Destroy(gameObject, 5.0F);
}