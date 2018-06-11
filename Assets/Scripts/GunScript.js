#pragma strict

public var projectile : Transform;
public var ammo : int;
public var MAX_AMMO : int;
public var projectileSpeed : float;
public var projectileSpawn : Transform;
public var sensativity : float;
private var right : Vector3;
private var down : Vector3;

//public var vrCtrl : GvrControllerInput;

// Use this for initialization
function Awake () {
	right = transform.TransformDirection(Vector3.right);
	down = transform.TransformDirection(Vector3.down);

}

// Update is called once per frame
function Update () {
	var fire : boolean = Input.GetButtonDown("FireProjectile");
	//var fire2 : boolean = vrCtrl.ClickButtonDown();
	var rotateLR : float = Input.GetAxis("RotateHGun");
	var rotateUD : float = Input.GetAxis("RotateVGun");
	var posLR : float = Input.GetAxis("PositionGunX");
	var posUD : float = Input.GetAxis("PositionGunY");

	if (fire)
	{
		fireEgg();
	}
	if (rotateLR)
	{
		transform.Rotate(Vector3.up * rotateLR * sensativity * Time.deltaTime, Space.World);
	}
	if (rotateUD)
	{
		transform.Rotate(Vector3.right * rotateUD * sensativity * Time.deltaTime, Space.Self);
	}
	if (posLR)
	{
		transform.Translate(right * posLR * Time.deltaTime, Space.World);
	}
	if (posUD)
	{
		transform.Translate(down * posUD * Time.deltaTime, Space.World);
	}
}

function fireEgg()
{
	var parent : Transform = gameObject.transform;
	var spawnPos : Vector3 = projectileSpawn.position;
	var spawnAngle : Quaternion = new Quaternion();
	spawnAngle.SetLookRotation(parent.transform.forward, parent.transform.up);
	var projInst : Transform = Instantiate(projectile, spawnPos, Quaternion.identity);

	projInst.rotation = spawnAngle;
	var projScript : ProjectileScript = projInst.gameObject.AddComponent(ProjectileScript);
	projScript.setSpeed(transform.TransformDirection(Vector3.forward * projectileSpeed));

}

/*
function randomSpawn () {

	 var spawnPosInd : int = Random.Range(0, 3);
	 var target : Transform;
	 var spawnPos : Vector3;
	 var spawnAngle : Quaternion; 
	 switch (spawnPosInd)
	 {
	 	case 0:
	 		spawnPos = spawnLeft.transform.position;
	 		//spawnPos.z += .3 * count;
	 		//spawnPos.y += SPAWN_DEPTH; 
	 		target = Instantiate(targetBasic, spawnPos, spawnAngle, spawnLeft.transform);
	 		break;
	 	case 1:
	 		spawnPos = spawnMid.transform.position;
	 		//spawnPos.z += .3 * count;
	 		//spawnPos.y += SPAWN_DEPTH;
	 		target = Instantiate(targetBasic, spawnPos, spawnAngle, spawnMid.transform);
	 		break;
	 	case 2:
	 		spawnPos = spawnRight.transform.position;
	 		//spawnPos.z += .3 * count;
	 		//spawnPos.y += SPAWN_DEPTH;
	 		target = Instantiate(targetBasic, spawnPos, spawnAngle, spawnRight.transform);
	 		break;
	 }
	 var rot : Quaternion = new Quaternion();
	 rot.SetLookRotation(target.parent.forward, target.parent.transform.up);
	 target.rotation = rot;
	 //target.transform.rotation.SetLookRotation(target.parent.forward, target.parent.transform.up);
	 target.transform.Translate((Vector3.forward * (.3 * count)));
	 target.Translate(-Vector3.up * (SPAWN_DEPTH));
	 target.gameObject.AddComponent(AbductorScript);
	 count++;
}
*/