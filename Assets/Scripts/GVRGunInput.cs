using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GVRGunInput : MonoBehaviour {

    public CGunScript gun;

	// Use this for initialization
	void Start () {
		if (gun == null)
        {
            enabled = false;
        }
	}
	
	// Update is called once per frame
	void Update ()
    {
	    	
	}
}
