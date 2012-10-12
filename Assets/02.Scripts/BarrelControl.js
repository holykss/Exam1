#pragma strict

public var hitCount : int = 0;
public var sparkEffect : GameObject;
public var sparkEffectForBarrel : GameObject;


function OnCollisionEnter (Coll : Collision) {
	if (Coll.gameObject.tag == "BULLET")
	{
		OnDamageWithPosition(Coll.transform.position);
		Destroy(Coll.gameObject);
	}
}

function OnDamageWithPosition(position : Vector3)
{
	Instantiate(sparkEffect, position, transform.rotation);
		
	++hitCount;
	if (hitCount >= 3)
	{
		expBarrel();
	}
}

function expBarrel () {
	gameObject.AddComponent(Rigidbody);
	Instantiate(sparkEffectForBarrel, transform.position, transform.rotation);
	
	// 필요할때에 물리 엔진 요소를 넣어준다.
	//gameObject.rigidbody.AddForce(Vector3.up * 100.0F);
	
	Destroy(gameObject, 5.0F);
}

