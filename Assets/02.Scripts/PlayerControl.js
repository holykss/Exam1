#pragma strict


class _anim {
	var walk : AnimationClip;
	var walk_back : AnimationClip;
	var shoot : AnimationClip;
	var idle : AnimationClip[];
	var die : AnimationClip[];
	
	
}

public var anim : _anim;
public var animBody : GameObject;

private var speed : float = 10.0F;

public var firePos : Transform;
public var bulletPrefab : GameObject;

public var fireSfx : AudioClip;

private var global : Global;
public var hp : int = 100;

public var fsHpBar : UIFilledSprite;



function Start()
{
	global = GameObject.Find("Global").GetComponent.<Global>();

	var idx : int = Random.Range(0, anim.idle.length);
	animBody.animation.clip = anim.idle[idx];
	animBody.animation.Play();
}

function Update () {

	if (hp <=0)
		return;

	var hor : float = Input.GetAxis("Horizontal");
	
//	#if UNITY_EDITOR
//	Debug.Log("Hor = " + hor.ToString());
//	#endif
	
	
	var ver : float = Input.GetAxis("Vertical");
//	#if UNITY_IPHONE || UNITY_ANDROID
//	Debug.Log("Ver = " + ver);
//	#endif
	
	transform.Translate(Vector3.forward * ver * Time.deltaTime * speed);
//	transform.Translate(Vector3.right * hor * Time.deltaTime * speed);
	transform.Rotate(Vector3.up * hor * Time.deltaTime * 100.0F);
	
	if (ver <0)
	{
		animBody.animation.CrossFade(anim.walk_back.name, 0.5F);
	}
	else if (ver > 0){// || hor != 0) {
		animBody.animation.CrossFade(anim.walk.name, 0.5F);
	}
	else 
	{
		animBody.animation.CrossFade(anim.idle[0].name, 0.5F);
	}
	
	if (Input.GetButtonDown("Jump")) {
	
	
//		audio.clip = fireSfx;
//		audio.Play();

		global.PlaySfx(fireSfx, transform.position);
		
		var _bullet : GameObject = Instantiate(bulletPrefab, firePos.position, firePos.rotation);
		
		Destroy(_bullet, 2.0F);
	}
	
	
	if (Input.GetButtonDown("Fire1")) {
		Debug.Log("create Minion)");
		
		var hit : RaycastHit;
		
		if (Physics.Raycast(firePos.position, firePos.forward, hit, 100.0f))
		{
			if (hit.collider.tag == "BARREL")
			{
				hit.collider.GetComponent.<BarrelControl>().OnDamage();
			}
			else if (hit.collider.tag == "ENEMY")
			{
				hit.collider.GetComponent.<EnemyControl>().OnDamage(100);
			}
		
		}
	
	
	}
	
}

function OnTriggerEnter (Coll : Collider)
{
	if (Coll.gameObject.tag == "PUNCH")
	{
		hp -= 10;
		
		fsHpBar.fillAmount = hp / 100.0F;
		
		Debug.Log("Hp = " + hp);
		
		if (hp <= 0)
		{
			die();
		}
	}
}

function die()
{
	gameObject.GetComponent.<CapsuleCollider>().enabled = false;
	gameObject.GetComponent.<Rigidbody>().useGravity = false;
	
	var idx = Random.Range(0, anim.die.Length);
	
	animBody.animation.CrossFade(anim.die[idx].name, 0.2F);
}