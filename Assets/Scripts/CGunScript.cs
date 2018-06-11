using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CGunScript : MonoBehaviour {

    public Transform projectile;
    //public int ammo;
    //public int MAX_AMMO;
    public float projectileSpeed;
    public Transform projectileSpawn;
    private Vector3 right;
    private Vector3 down;

    // Use this for initialization
    public void Awake()
    {
        right = transform.TransformDirection(Vector3.right);
        down = transform.TransformDirection(Vector3.down);
    }

    // Update is called once per frame
    public void Update()
    {
        bool fire = Input.GetButtonDown("FireProjectile");
        bool fire2 = GvrControllerInput.ClickButtonDown;

        if (fire || fire2)
        {
            fireEgg();
        }
    }

    public void fireEgg()
    {
        Transform parent = gameObject.transform;
        Vector3 spawnPos = projectileSpawn.position;
        Quaternion spawnAngle = new Quaternion();
        spawnAngle.SetLookRotation(parent.transform.forward, parent.transform.up);
        Transform projInst = Instantiate(projectile, spawnPos, Quaternion.identity);

        projInst.rotation = spawnAngle;
        CProjectileScript projScript = projInst.gameObject.AddComponent<CProjectileScript>();
        projScript.setSpeed(transform.TransformDirection(Vector3.forward * projectileSpeed));

    }

}
