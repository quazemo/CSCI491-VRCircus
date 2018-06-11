using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CProjectileScript : MonoBehaviour {

    Rigidbody physicsBody;

    public void Awake()
    {
        physicsBody = gameObject.GetComponent<Rigidbody>();
    }

    public void setSpeed(Vector3 speed)
    {
        physicsBody.velocity = speed;
    }

    public void OnCollisionEnter(Collision col)
    {
        Destroy(gameObject);
    }
}
